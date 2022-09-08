import {
  HeaderLayout,
  ModifyPantryCard,
  SideBar,
  AdminWrapperLayout,
} from "../../components";

const DeletedPantry = () => {
  return (
    <div>
      <HeaderLayout title="Deleted Pantry" />
      <div className="flex">
        <SideBar />
        <AdminWrapperLayout title="Deleted Pantry">
          <ModifyPantryCard />
        </AdminWrapperLayout>
      </div>
    </div>
  );
};

export default DeletedPantry;
