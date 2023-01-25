//coupon model
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CouponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

//coupon is expired
CouponSchema.virtual("isExpired").get(function () {
  return this.endDate < Date.now();
});

CouponSchema.virtual("daysLeft").get(function () {
  const daysLeft =
    Math.ceil((this.endDate - Date.now()) / (1000 * 60 * 60 * 24)) +
    " " +
    "Days left";
  return daysLeft;
});

//validation
CouponSchema.pre("validate", function (next) {
  if (this.endDate < this.startDate) {
    next(new Error("End date cannot be less than the start date"));
  }
  next();
});

CouponSchema.pre("validate", function (next) {
  if (this.startDate < Date.now()) {
    next(new Error("Start date cannot be less than today"));
  }
  next();
});

CouponSchema.pre("validate", function (next) {
  if (this.endDate < Date.now()) {
    next(new Error("End date cannot be less than today"));
  }
  next();
});

CouponSchema.pre("validate", function (next) {
  if (this.discount <= 0 || this.discount > 100) {
    next(new Error("Discount cannot be less than 0 or greater than 100"));
  }
  next();
});

const Coupon = mongoose.model("Coupon", CouponSchema);

export default Coupon;
