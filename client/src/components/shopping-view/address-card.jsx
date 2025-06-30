import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { MapPin, Phone, StickyNote, Building2 } from "lucide-react";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  const isSelected = selectedId?._id === addressInfo?._id;

  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer transition-all duration-200 border-2 ${
        isSelected
          ? "border-primary ring-2 ring-primary/40"
          : "border-muted"
      } hover:shadow-lg`}
    >
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start gap-3">
          <MapPin className="text-muted-foreground" size={18} />
          <div>
            <Label className="text-base font-semibold text-foreground">
              {addressInfo?.address}
            </Label>
            <p className="text-sm text-muted-foreground">{addressInfo?.city}, {addressInfo?.pincode}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="text-muted-foreground" size={18} />
          <p className="text-sm text-muted-foreground">{addressInfo?.phone}</p>
        </div>

        {addressInfo?.notes && (
          <div className="flex items-start gap-3">
            <StickyNote className="text-muted-foreground" size={18} />
            <p className="text-sm text-muted-foreground">{addressInfo?.notes}</p>
          </div>
        )}

      </CardContent>

      <CardFooter className="flex justify-between px-5 pb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleEditAddress(addressInfo);
          }}
        >
          Edit
        </Button>
        <Button
          // variant="destructive"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteAddress(addressInfo);
          }}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
