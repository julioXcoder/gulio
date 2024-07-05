import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import z from "zod";

type Icon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

interface Path {
  title: string;
  path: string;
  Icon: Icon;
}

const ImageSchema = z.object({
  image: z
    .any()
    .optional()
    .nullable()
    .refine((file) => file && file.size <= 100000 * 1024, {
      message: "Image should be less than 10MB",
    }),
});

export type { Path };
export { ImageSchema };
