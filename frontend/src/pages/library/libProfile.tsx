import { ImagePreview, uploadImage } from "@/components/common/fileUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MEDIA_TYPE, ROLES } from "@/data/enum";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { ILibraryInterface } from "@/interface/library.interface";
import { getSingleLibrary, updateLibrary } from "@/rtk/thunk/library.thunk";
import { LibraryUpdateSchema } from "@/utils/formschema";
import { useMentTags } from "@/utils/metaTags";
import { BlockedStatusBadge, StatusBadge } from "@/utils/statusBadge";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

function LibProfile() {
  useMentTags("Library Profile - Library Management System");

  const { id } = useParams();

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const { library } = useAppSelector((state) => state.library);

  const { register, handleSubmit, reset } = useForm<ILibraryInterface>({
    resolver: yupResolver(LibraryUpdateSchema),
    defaultValues: {
      name: library?.name,
      email: library?.auth.email,
      phoneNumber: library?.phoneNumber,
      description: library?.description,
      city: library?.city,
      state: library?.state,
      street: library?.street,
    },
  });

  useEffect(() => {
    dispatch(getSingleLibrary({ id: id ?? "" }));
  }, [dispatch]);

  useEffect(() => {
    reset({
      name: library?.name,
      email: library?.auth.email,
      phoneNumber: library?.phoneNumber,
      description: library?.description,
      city: library?.city,
      state: library?.state,
      street: library?.street,
      // address: library?.address,
    });
  }, [library]);
  const onSubmit = async (data: Partial<ILibraryInterface>) => {
    try {
      let result;

      if (file) {
        result = await uploadImage({
          file: file,
          mediaType: MEDIA_TYPE.PROFILE,
        });
      }

      const updatedData = {
        ...data,
        ...(result && { media: result }),
      };

      console.log("🚀 ~ onSubmit ~ updatedData:", updatedData);

      await dispatch(
        updateLibrary({
          id: id as string,
          data: updatedData as ILibraryInterface,
        })
      ).unwrap();

      dispatch(getSingleLibrary({ id: id ?? "" }));
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Clean up old object URL when component unmounts or file changes
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <section className="w-full min-h-screen bg-muted/40 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl bg-background border border-border rounded-2xl shadow-sm p-8 md:p-12 space-y-10">
        <header className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Edit Library Profile
          </h1>
          <p className="text-muted-foreground text-base">
            Update your library's information and account settings.
          </p>
        </header>
        <div className="flex flex-col items-center space-y-4">
          <ImagePreview
            library={library}
            setFile={setFile}
            previewUrl={previewUrl}
          />

          <p className="md:text-3xl text-shadow-lg font-semibold text-foreground">
            {library?.name || "Library Name"}
          </p>
        </div>
        <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
          {/* Basic Info */}
          <div className="space-y-6">
            <legend className="text-xl font-semibold text-foreground border-b pb-2">
              📇 Basic Information
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="libraryName">Library Name</Label>
                <Input
                  id="libraryName"
                  placeholder="Enter library name"
                  className="text-sm h-10"
                  disabled={ROLES?.LIBRARY_EMP === library?.role}
                  {...register("name")}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  className="text-sm h-10"
                  disabled={ROLES?.LIBRARY_EMP === library?.role}
                  {...register("email")}
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <legend className="text-xl font-semibold text-foreground border-b pb-2">
              📞 Contact Information
            </legend>
            <div className="space-y-3 w-full md:w-1/2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                placeholder="Enter phone number"
                className="text-sm h-10"
                disabled={ROLES?.LIBRARY_EMP === library?.role}
                {...register("phoneNumber")}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-6">
            <legend className="text-xl font-semibold text-foreground border-b pb-2">
              📝 Library Description
            </legend>
            <div className="space-y-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter a brief description of the library"
                className="resize-none text-sm"
                disabled={ROLES?.LIBRARY_EMP === library?.role}
                {...register("description")}
              />
            </div>
          </div>

          {/* Address Section */}
          <div className="w-full space-y-6 border border-border rounded-xl p-6 bg-muted/20">
            <legend className="text-lg font-semibold text-foreground px-2">
              🏠 Address Information
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="street" className="text-base font-medium">
                  Street Address
                </Label>
                <Input
                  id="street"
                  placeholder="123 Main St"
                  className="text-sm h-10"
                  disabled={ROLES?.LIBRARY_EMP === library?.role}
                  {...register("street")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-base font-medium">
                  City
                </Label>
                <Input
                  id="city"
                  placeholder="City"
                  className="text-sm h-10"
                  disabled={ROLES?.LIBRARY_EMP === library?.role}
                  {...register("city")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state" className="text-base font-medium">
                  State
                </Label>
                <Input
                  id="state"
                  placeholder="State"
                  className="text-sm h-10"
                  disabled={ROLES?.LIBRARY_EMP === library?.role}
                  {...register("state")}
                />
              </div>
            </div>
          </div>

          {/* Status Section */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label>Status</Label>
              <StatusBadge status="ACCEPTED" />
            </div>
            <div className="space-y-3">
              <Label>Account Status</Label>
              <BlockedStatusBadge status="ACTIVE" />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              aria-label="save"
              className="px-6 py-2 bg-green-primary text-white hover:bg-green-600 transition-colors text-sm font-medium"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default LibProfile;
