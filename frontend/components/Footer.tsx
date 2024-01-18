import React from "react";

const Footer = () => {
  const productList = ["Market", "ERC20 Token", "Donation"];
  const contactList = [
    "alavannwanorim@gmail.com",
    "info@example.com",
    "Contact us",
  ];
  const usefulList = ["Home", "about Us", "Company Bio"];
  return (
    <footer className="text-center text-white bg-main lg:text-left">
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid-col-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="">
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              Crypto King
            </h6>
            <p>
              Here you can use rows and columns to organize footer contents.
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur, consequuntur.
            </p>
          </div>
          <div className="">
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Products
            </h6>
            {productList.map((el, i) => (
              <p className="mb-4" key={i + 1}>
                <a href="#" className="">
                  {el}
                </a>
              </p>
            ))}
          </div>
          <div className="">
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Useful Links
            </h6>
            {usefulList.map((el, i) => (
              <p className="mb-4" key={i + 1}>
                <a href="#" className="">
                  {el}
                </a>
              </p>
            ))}
          </div>
          <div className="">
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              contact
            </h6>
            {contactList.map((el, i) => (
              <p className="mb-4" key={i + 1}>
                <a href="#" className="">
                  {el}
                </a>
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-main p-6 text-center">
        <span>Copyright &copy; 2023, All Rights Reserved</span>
        <a href="#" className="font-semibold">
          Crypto King
        </a>
      </div>
    </footer>
  );
};

export default Footer;
