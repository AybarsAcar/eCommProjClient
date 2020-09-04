//we dont need xl for the size
//because we started to make our design to look good on a full size laptop screen

export default {
  up() {

  },
  down(size){
      const sizes = {
          xs: "575.98px",
          sm: "767.98px",
          md: "991.98px",
          lg: "1100.98px",
          xl: "1400px"
      }
      return `@media (max-width: ${sizes[size]})`;
  }
}
