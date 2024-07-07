import React from "react";
import { Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

const Quantity = ({ quantity, onQuantityChange }: Props) => {
  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      onQuantityChange(value);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Button size="icon" variant="ghost" onClick={handleDecrease}>
        <Minus className="shrink-0 size-6" />
      </Button>
      <Input
        type="number"
        min={0}
        value={quantity}
        onChange={handleChange}
        className="border p-2 w-10 text-center flex"
      />
      <Button size="icon" variant="ghost" onClick={handleIncrease}>
        <Plus className="shrink-0 size-6" />
      </Button>
    </div>
  );
};

export default Quantity;
