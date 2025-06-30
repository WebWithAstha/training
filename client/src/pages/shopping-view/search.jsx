import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { addToCart, fetchCartItems } from "@/store/slices/shop/cart-slice/index.js";
import { fetchProductDetails } from "@/store/slices/shop/products-slice/index.js";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/slices/shop/search-slice/index.js";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  useEffect(() => {
    if (keyword && keyword.trim().length > 3) {
      const delay = setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 500);
      return () => clearTimeout(delay);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword]);

  function handleAddtoCart(productId, totalStock) {
    const getCartItems = cartItems.items || [];

    const existingItem = getCartItems.find(item => item.productId === productId);

    if (existingItem && existingItem.quantity + 1 > totalStock) {
      toast(`Only ${existingItem.quantity} quantity can be added for this item`);
      return;
    }

    dispatch(addToCart({
      userId: user?.id,
      productId,
      quantity: 1,
    })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast("Product added to cart");
      }
    });
  }

  function handleGetProductDetails(productId) {
    dispatch(fetchProductDetails(productId));
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-10">
      {/* Search bar */}
      <div className="flex justify-center mb-10">
  <div className="relative w-full min-w-2xl">
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
    <Input
      value={keyword}
      name="keyword"
      onChange={(e) => setKeyword(e.target.value)}
      className="w-full pl-12 pr-4 py-6 text-lg border border-gray-300 focus:border-black focus:ring-0 rounded-lg transition-all duration-200"
      placeholder="Search products..."
    />
  </div>
</div>

      {/* No Results */}
      {!searchResults.length && keyword.trim().length > 3 ? (
        <div className="text-center text-gray-500 text-2xl font-semibold py-12">
          No results found!
        </div>
      ) : null}

      {/* Product Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {searchResults.map((item) => (
          <ShoppingProductTile
            key={item._id}
            handleAddtoCart={handleAddtoCart}
            product={item}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>

      {/* Product Details Modal */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;
