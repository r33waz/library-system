import ProfessionalBreadcrumb from "@/components/common/breadCrumb";
import ImageModal from "@/components/common/imageModal";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getSingleLibrary } from "@/rtk/thunk/library.thunk";
import { BlockedStatusBadge, StatusBadge } from "@/utils/statusBadge";
import { Building } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SingleLibrary() {
  const [showImage, setShowImage] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("🚀 ~ SingleLibrary ~ id:", id);

  const dispatch = useAppDispatch();

  const { library } = useAppSelector((state) => state.library);

  useEffect(() => {
    if (id) {
      dispatch(getSingleLibrary({ id: id }));
    }
  }, [id, dispatch]);

  console.log("🚀 ~ SingleLibrary ~ library:", library);

  return (
    <>
      <ProfessionalBreadcrumb
        items={[
          { label: "Home", href: "/e-book/home" },
          { label: library?.name as string },
        ]}
      />
      <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-sm overflow-hidden mb-8 transition-all duration-300 hover:shadow-md">
        <div className="relative h-48 md:h-64 bg-gradient-to-r from-teal-500 to-teal-600">
          <div className="absolute inset-0  opacity-20"></div>
          <div className="absolute bottom-10 left-0 w-full p-6 text-white">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2 ">
                <Building /> {library?.name}
              </h1>
              <div className="flex space-x-2">
                {StatusBadge({ status: library?.status as string })}
                {BlockedStatusBadge({ status: library?.blocked as string })}
              </div>
            </div>
            <p className=" mt-2 max-w-2xl">{library?.description}</p>
          </div>
        </div>

        <div className="p-6 md:p-8 ">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex-shrink-0 -mt-20 md:-mt-24 mb-6 md:mb-0 md:mr-8">
              <div
                onClick={() => setShowImage(true)}
                className="relative w-32 cursor-pointer h-32 md:w-52 md:h-52 rounded-md overflow-hidden border-3 border-white shadow-lg"
              >
                <img
                  src={library?.profilepic.path || "/placeholder.svg"}
                  alt={library?.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 ">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="w-5 h-5 text-teal-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium ">EMAIL</p>
                  <p className="mt-1  font-medium">{library?.auth?.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="w-5 h-5 text-teal-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium ">PHONE</p>
                  <p className="mt-1  font-medium">{library?.phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="w-5 h-5 text-teal-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium ">MEMBER SINCE</p>
                  <p className="mt-1  font-medium">
                    {moment(library?.createdAt).format("DD-MM-YYYY")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Address Information */}
        <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-teal-100 rounded-lg mr-4">
              <svg
                className="w-6 h-6 text-teal-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold ">Address Information</h2>
          </div>

          <div className="space-y-5">
            <div className="flex">
              <div className="w-1/3">
                <h3 className="text-sm font-medium ">STREET</h3>
              </div>
              <div className="w-2/3">
                <p className=" font-medium">{library?.street}</p>
              </div>
            </div>

            <div className="flex">
              <div className="w-1/3">
                <h3 className="text-sm font-medium ">CITY</h3>
              </div>
              <div className="w-2/3">
                <p className=" font-medium">{library?.city}</p>
              </div>
            </div>

            <div className="flex">
              <div className="w-1/3">
                <h3 className="text-sm font-medium ">STATE</h3>
              </div>
              <div className="w-2/3">
                <p className=" font-medium">{library?.state}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Information */}
        <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-teal-100 rounded-lg mr-4">
              <svg
                className="w-6 h-6 text-teal-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold ">Activity Information</h2>
          </div>

          <div className="space-y-5">
            <div className="flex">
              <div className="w-1/3">
                <h3 className="text-sm font-medium ">ROLE</h3>
              </div>
              <div className="w-2/3">
                <p className=" font-medium">
                  {library?.role.replace("_", " ")}
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="w-1/3">
                <h3 className="text-sm font-medium ">LIBRARY ID</h3>
              </div>
              <div className="w-2/3">
                <p className=" font-medium break-all text-sm">{library?.id}</p>
              </div>
            </div>

            <div className="flex">
              <div className="w-1/3">
                <h3 className="text-sm font-medium ">CREATED AT</h3>
              </div>
              <div className="w-2/3">
                <p className=" font-medium">
                  {moment(library?.createdAt).format("DD-MM-YYYY")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-between items-center">
        <Button
          onClick={() => navigate(`/e-book/books`)}
          aria-label="Edit"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-green-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          <svg
            className="w-4 h-4 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          Browse Books
        </Button>
      </div>
      {showImage && (
        <ImageModal
          image={library?.profilepic?.path as string}
          setShowImage={setShowImage}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-w-2xl h-[500px] object-fill"
        />
      )}
    </>
  );
}

export default SingleLibrary;
