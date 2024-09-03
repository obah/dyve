export type IconProps = React.SVGProps<SVGSVGElement>;

export const Icons = {
  starIcon: ({ ...props }: IconProps) => (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.23 16L10 13.45L5.77 16L6.89 11.19L3.16 7.96L8.08 7.54L10 3L11.92 7.53L16.84 7.95L13.11 11.18L14.23 16ZM10 0C4.47 0 0 4.5 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0Z"
        fill="white"
      />
    </svg>
  ),
  triangle: ({ ...props }: IconProps) => (
    <svg
      {...props}
      width="44"
      height="49"
      viewBox="0 0 44 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40.5217 19.6051C44.2898 21.7806 44.2899 27.2194 40.5217 29.3949L8.72826 47.7509C4.96015 49.9264 0.249998 47.207 0.249998 42.856L0.249999 6.14403C0.25 1.79298 4.96014 -0.926425 8.72826 1.2491L40.5217 19.6051Z"
        fill="#EBEBEB"
      />
    </svg>
  ),
};
