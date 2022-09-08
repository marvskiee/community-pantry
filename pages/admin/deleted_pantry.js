import { HeaderLayout, SideBar, WrapperLayout } from "../../components";

const DeletedPantry = () => {
  return (
    <div>
      <HeaderLayout title="Deleted Pantry" />
      <div className="flex">
        <SideBar />
        <WrapperLayout title="Deleted Pantry"></WrapperLayout>
      </div>
    </div>
  );
};

export default DeletedPantry;
