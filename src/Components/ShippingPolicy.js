import React, { useEffect } from "react";
import "./policy.css"

function ShippingPolicy() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <div className="container m-auto mt-4 mb-4">
        <div className="row">
          <div className="col-12">
            <div className="shipping-policy-page">
              <h1 className='common-heading text-start'>SHIPPING POLICY</h1>
              <p className='common-para f1 paragraph-footer f1'>
                http://www.Hindustan.giksindia.com is committed to excellence,
                and the full satisfaction of our customers.
                http://www.Hindustan.giksindia.com proudly offers shipping
                services. Be assured we are doing everything in our power to get
                your order to you as soon as possible. Please consider any
                holidays that might impact delivery times.
                http://www.Hindustan.giksindia.com also offers same day dispatch.
              </p>
              <h1 className='common-heading text-start'>
                SHIPPING</h1>
              <p className='common-para f1 paragraph-footer f1'>
                All orders for our products are processed and shipped out in
                4-10 business days. Orders are not shipped or delivered on
                weekends or holidays. If we are experiencing a high volume of
                orders, shipments may be delayed by a few days. Please allow
                additional days in transit for delivery. If there will be a
                significant delay in the shipment of your order, we will contact
                you via email.
              </p>
              <h1 className='common-heading text-start'>WRONG ADDRESS DISCLAIMER</h1>
              <p className='common-para f1 paragraph-footer f1'>
                It is the responsibility of the customers to make sure that the
                shipping address entered is correct. We do our best to speed up
                processing and shipping time, so there is always a small window
                to correct an incorrect shipping address. Please contact us
                immediately if you believe you have provided an incorrect
                shipping address.
              </p>
              <h1 className='common-heading text-start'>UNDELIVERABLE ORDERS</h1>
              <p className='common-para f1 paragraph-footer f1'>
                Orders that are returned to us as undeliverable because of
                incorrect shipping information are subject to a restocking fee
                to be determined by us.
              </p>
              <h1 className='common-heading text-start'>LOST/STOLEN PACKAGES</h1>
              <p className='common-para f1 paragraph-footer f1'>
                http://www.Hindustan.giksindia.com is not responsible for lost or
                stolen packages. If your tracking information states that your
                package was delivered to your address and you have not received
                it, please report to the local authorities.
              </p>
              <h1 className='common-heading text-start'>RETURN REQUEST DAYS</h1>
              <p className='common-para f1 paragraph-footer f1'>
                http://www.Hindustan.giksindia.com allows you to return its item
                (s) within a period of 7 days. Kindly be advised that the item
                (s) should be returned unopened and unused.
              </p>
              <h1 className='common-heading text-start'>OUT OF STOCK ITEM PROCESS</h1>
              <p className='common-para f1 paragraph-footer f1'>
                http://www.Hindustan.giksindia.com has the following options in
                the event there are items which are out of stock
                http://www.Hindustan.giksindia.com Wait for all items to be in
                stock before dispatching.
              </p>
              <h1 className='common-heading text-start'>IMPORT DUTY AND TAXES</h1>
              <p className='common-para f1 paragraph-footer f1'>
                When dealing with http://www.Hindustan.giksindia.com you have the
                following options when it comes to taxes as well as import
                duties:You will be required to settle the requisite fees when
                the items are arriving in the destination country.
              </p>
              <h1 className='common-heading text-start'>ACCEPTANCE</h1>
              <p className='common-para f1 paragraph-footer f1'>
                By accessing our site and placing an order you have willingly
                accepted the terms of this Shipping Policy.
              </p>
              <h1 className='common-heading text-start'>CONTACT INFORMATION</h1>
              <p className='common-para f1 paragraph-footer f1'>
                In the event you have any questions or comments please reach us
                via the following contacts: Email - Email :
                Hindustan.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShippingPolicy;
