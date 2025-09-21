import { CardBody, CardFooter, CardHeader, Card as HeroCard, Image } from "@heroui/react";

/* **
 * Props and types
 ** */

interface CardProps {
  header: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  coverImageUrl?: string;
  opts?: {
    shadow?: "none" | "sm" | "md" | "lg";
    radius?: "none" | "sm" | "md" | "lg";
    fullWidth?: boolean;
    isHoverable?: boolean;
    isBlurred?: boolean;
    isFooterBlurred?: boolean;
    isDisabled?: boolean;
    disableAnimation?: boolean;
    disableRipple?: boolean;
    allowTextSelectionOnPress?: boolean;
  };
  handlers?: {
    onPress?: () => void;
  };
  classNames?: string;
}

/* **
 * Component
 ** */

export function Card({ header, coverImageUrl, body, footer, opts, handlers }: CardProps) {
  return (
    <HeroCard
      className="py-4"
      isPressable={Boolean(handlers?.onPress)}
      onPress={handlers?.onPress}
      {...opts}
    >
      <CardHeader className="flex-col items-start px-4 pt-2 pb-0">{header}</CardHeader>
      {coverImageUrl && (
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 h-full w-full object-cover"
          src={coverImageUrl}
        />
      )}
      <CardBody className="overflow-visible py-2">{body}</CardBody>
      <CardFooter className="text-small justify-between">{footer}</CardFooter>
    </HeroCard>
  );
}
