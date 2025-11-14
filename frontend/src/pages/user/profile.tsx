import BreadCrumb from "@/components/common/breadCrumb";

function UserProfile() {
  return (
    <section>
      <BreadCrumb
        items={[{ label: "Home", href: "/e-book/home" }, { label: "Profile" }]}
      />

      <div className="mt-6">UserProfile</div>
    </section>
  );
}

export default UserProfile;
