import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("⚠️ .env.local ফাইলে MONGODB_URI পাওয়া যায়নি!");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

async function connectDB() {
  // ১. কানেকশন সক্রিয় থাকলে সরাসরি রিটার্ন
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // ২. যদি কোনো এরর হয়ে থাকে, তবে পুরনো হ্যাং হওয়া প্রমিজ রিসেট করা
  if (mongoose.connection.readyState === 0) {
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, // ১০ সেকেন্ড ওয়েট করবে
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log("✅ MongoDB Connected Successfully!");
      return mongooseInstance;
    }).catch((err) => {
      cached.promise = null; // ফেল করলে ক্যাশ সম্পূর্ণ ক্লিয়ার
      cached.conn = null;
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    cached.conn = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;