import { Button } from "@/components/ui/button";

import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import { toast } from "sonner";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];
function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { user } = useSelector((state) => state.auth);
console.log(user)
  

  const featureImageList = ["https://images.unsplash.com/photo-1750024774702-1fd1a377fdfb?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1692130960203-1e62295281de?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1618864746159-ec96c3a32ce7?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ]




  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);



//   console.log(productList, "productList");

  return (
    <div className="flex flex-col w-full bg-rose-500 min-h-screen">
        
      <div className="relative w-full h-[500px] bg-gradient-to-br from-white to-rose-50 overflow-hidden">
        {featureImageList.map((img, index) => (
              <img
                src={img}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
        }
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
       <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => {
  const Icon = categoryItem.icon;
  return (
    <Card
      key={categoryItem.id}
      className="cursor-pointer hover:shadow shadow-xs transition-shadow bg-gradient-to-br hover:from-white hover:to-rose-50"
    >
      <CardContent className="flex flex-col items-center justify-center p-6">
        <Icon className="w-12 h-12 mb-4 text-primary" />
        <span className="font-bold">{categoryItem.label}</span>
      </CardContent>
    </Card>
  );
})}

          </div>
        </div>
      </section>
  
      <section className="py-12 pt-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
           {brandsWithIcon.map((brandItem) => {
  const Icon = brandItem.icon;
  return (
    <Card
      key={brandItem.id}
      className="cursor-pointer hover:shadow shadow-xs transition-shadow bg-gradient-to-br hover:from-white hover:to-rose-50"
    >
      <CardContent className="flex flex-col items-center justify-center p-6">
        <Icon className="w-12 h-12 mb-4 text-primary" />
        <span className="font-bold">{brandItem.label}</span>
      </CardContent>
    </Card>
  );
})}

          </div>
        </div>
      </section>

    </div>
  );
}

export default ShoppingHome;