import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "../../store/slices/shop/cart-slice/index";
import { setProductDetails } from "@/store/slices/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { addReview, getReviews } from "@/store/slices/shop/review-slice/index.js";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const handleRatingChange = (value) => setRating(value);

  const handleAddToCart = (productId, totalStock) => {
    const cart = cartItems.items || [];
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem && existingItem.quantity + 1 > totalStock) {
      toast(`Only ${existingItem.quantity} quantity can be added for this item`);
      return;
    }

    dispatch(addToCart({ userId: user?.id, productId, quantity: 1 }))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast("Product added to cart");
        }
      });
  };

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  };

  const handleAddReview = () => {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast("Review added successfully!");
      }
    });
  };

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:p-10 max-w-[95vw] sm:max-w-[85vw] lg:max-w-[70vw]">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-xl border">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="w-full h-full object-cover aspect-square"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-5">
          <div>
            <h1 className="text-3xl font-bold">{productDetails?.title}</h1>
            <p className="text-muted-foreground mt-2 text-lg">{productDetails?.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className={`text-2xl font-bold ${productDetails?.salePrice > 0 ? "line-through text-muted-foreground" : "text-primary"}`}>
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 && (
              <p className="text-2xl font-bold text-primary">${productDetails?.salePrice}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <StarRatingComponent rating={averageReview} />
            <span className="text-muted-foreground text-sm">({averageReview.toFixed(2)})</span>
          </div>

          <div>
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed" disabled>
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)}
              >
                Add to Cart
              </Button>
            )}
          </div>

          <Separator />

          {/* Reviews */}
          <div className="space-y-4 max-h-[280px] overflow-auto pr-2">
            <h2 className="text-xl font-semibold">Customer Reviews</h2>
            {reviews && reviews.length > 0 ? (
              reviews.map((reviewItem, index) => (
                <div key={index} className="flex gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarFallback>
                      {reviewItem?.userName?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-medium">{reviewItem?.userName}</h3>
                    <StarRatingComponent rating={reviewItem?.reviewValue} />
                    <p className="text-muted-foreground text-sm">{reviewItem?.reviewMessage}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No reviews yet.</p>
            )}
          </div>

          {/* Add Review */}
          <div className="pt-6 space-y-3 border-t">
            <Label className="font-semibold">Write a Review</Label>
            <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange} />
            <Input
              name="reviewMsg"
              value={reviewMsg}
              onChange={(e) => setReviewMsg(e.target.value)}
              placeholder="Share your thoughts..."
              className="text-sm"
            />
            <Button onClick={handleAddReview} disabled={reviewMsg.trim() === ""}>
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
