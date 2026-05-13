import Image from "next/image";
import Link from "next/link";
import { CardType } from "./type";

export default function Card({
  primaryText,
  primaryTextStyles,
  secondaryText,
  secondaryTextStyles,
  description,
  descriptionStyles,
  textBlockStyles,
  stylesOfCard,
  bgImage,
  img,
  imageAltText,
  imgStyles,
  onClick,
  children,
  isLink,
  path,
}: CardType) {
  const content = (
    <>
      {img && (
        <Image
          src={img}
          alt={imageAltText || "france tour"}
          width={50}
          height={50}
          className={imgStyles}
        />
      )}
      <h3 className={primaryTextStyles}>{primaryText}</h3>
      <div className={textBlockStyles}>
        <p className={secondaryTextStyles}>{secondaryText}</p>
        <p className={descriptionStyles}>{description}</p>
      </div>
      {children && <div>{children}</div>}
    </>
  );

  return (
    <div
      className={stylesOfCard}
      style={
        bgImage
          ? {
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
      onClick={onClick}
    >
      {isLink && path ? (
        <Link target="_blank" href={path}>
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
}
