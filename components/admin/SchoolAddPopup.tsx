import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Console } from "console";


export default function DetailModal({ closeModal }) {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const cancelButtonRef = useRef(null);


  
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => closeModal(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-medium leading-5 text-gray-900"
                      >
                        Schools
                      </Dialog.Title>
                      
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 flex flex-row-reverse md:px-6">
                  <button
                    type="button"
                    className="inline-flex h-10 bottom-5 justify-center rounded-md border border-transparent bg-primary px-4 py-2 font-medium text-white shadow-base hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-offset-2 ml-3 w-auto text-base"
                    onClick={() => closeModal(false)}
                  >
                    OK
                  </button>
                  </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
