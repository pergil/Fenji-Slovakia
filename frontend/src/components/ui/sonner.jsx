import { Toaster as Sonner, toast } from "sonner"

const Toaster = ({
  ...props
}) => {
  return (
    <Sonner
      position="top-right"
      expand={true}
      richColors={true}
      closeButton={true}
      {...props}
    />
  );
}

export { Toaster, toast }
