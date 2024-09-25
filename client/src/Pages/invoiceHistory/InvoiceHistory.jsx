const InvoiceHistory = () => {
  return (
    <div className="bg-[#775050] my-10 rounded-[20px]">
      <div className="p-8">
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-3 space-y-4">
            <div className="bg-[#d3dfee] rounded-[20px] h-[160px]">
              <div className="pt-6 pl-6">
                <img src="/rmv_bg_logo1.png" alt="" className="w-[250px]" />
              </div>
            </div>
            <div className="bg-[#d3dfee] rounded-[20px] h-[160px]">
              <div className="pl-6 pt-4">
                <p>Invoice to:</p>
                <h2 className="text-xl font-semibold text-black">
                  Mauro Sicard
                </h2>
                <p>(612) 856 - 0989</p>
                <p>Pablo Alto, San Francisco, CA</p>
                <p>92102, United States of America</p>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex gap-4">
              <div className="bg-[#d6dff2] w-[270px] rounded-[20px]">
                <div className="p-4">
                  <div className=" space-y-2 mb-3">
                    <div className="bg-[#f2f3f4] rounded-[10px]">
                      <div className="p-4">
                        <h2 className="text-lg">Invoice number:</h2>
                        <h2 className="text-xl font-semibold text-black">
                          #001122
                        </h2>
                      </div>
                    </div>
                    <div className="bg-[#f2f3f4] rounded-[10px]">
                      <div className="p-4">
                        <h2 className="text-lg">Today's Date:</h2>
                        <h2 className="text-xl font-semibold text-black">
                          June 26, 2024
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="border-t-2 pt-3">
                    <h2 className="text-lg font-semibold">Total</h2>
                    <h2 className="text-[30px] font-semibold">$19,570.00</h2>
                    <h2 className="font-semibold">July 26, 2024</h2>
                  </div>
                </div>
              </div>
              <div className="bg-[#d6dff2] w-[270px] rounded-[20px]">
                <div className="p-4">
                  <div className=" space-y-2 mb-3">
                    <div className="bg-[#daa600] rounded-[10px]">
                      <div className="p-4">
                        <h2 className="text-lg">Membership:</h2>
                        <h2 className="text-xl font-semibold text-black">
                          Gold
                        </h2>
                      </div>
                    </div>
                    <div className="bg-[#f2f3f4] rounded-[10px]">
                      <div className="p-4">
                        <h2 className="text-lg">discount on purchase:</h2>
                        <h2 className="text-xl font-semibold text-black">5%</h2>
                      </div>
                    </div>
                  </div>

                  <div className="border-t-2 pt-3">
                    <h2 className="font-semibold">
                      Estimated Delivery of all Products:
                    </h2>
                    <h2 className="text-[30px] font-semibold">10/09/2024</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="overflow-x-auto mt-4">
            <table className="table w-full border-separate border-spacing-y-4 ">
              <thead>
                <tr className="bg-[#d6dff2]  border-none ">
                  <th className="rounded-l-full font-semibold text-base text-black">
                    Description
                  </th>
                  <th className="font-semibold text-base text-black">Qty</th>
                  <th className="font-semibold text-base text-black">Price</th>
                  <th className="font-semibold text-base text-black">Total</th>
                  <th className="font-semibold text-base text-black">
                    Track Product
                  </th>
                  <th className="rounded-r-full font-semibold text-base text-black">
                    Date of Payment
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr className="border-none">
                  <td className="bg-[#d6dff2] rounded-full font-semibold text-black p-4">
                    Oven
                  </td>
                  <td className="font-semibold text-black bg-[#d6dff2] rounded-full text-center p-4">
                    1
                  </td>
                  <td className="font-semibold text-black bg-[#d6dff2] rounded-full text-center p-4">
                    $5,250.00
                  </td>
                  <td className="font-semibold text-black bg-[#d6dff2] rounded-full text-center p-4">
                    $5,250.00
                  </td>
                  <td className="font-semibold text-black bg-[#d6dff2] rounded-full text-center p-4">
                    Handed Over
                  </td>
                  <td className="font-semibold text-black bg-[#d6dff2] rounded-full text-center p-4">
                    21/08/2024
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-[#d6dff2] col-span-4 rounded-full">
              <div className="flex justify-between px-8 py-2">
                <h2 className="font-semibold text-lg text-black">
                  Invoice total
                </h2>
                <h2 className="font-semibold text-2xl text-black">
                  $19,570.00
                </h2>
              </div>
            </div>
            <div className="col-span-1">
              <button className="bg-[#d6dff2] text-2xl text-black w-full py-2 font-bold rounded-full">
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceHistory;
