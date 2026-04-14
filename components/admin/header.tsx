import UserAccount from "../common/useraccount";

export default function HeaderAdmin(){
    return (
        <nav className="p-4 border-b flex justify-between items-center">
        <h1 className="font-bold">CapyBara Clothing</h1>
        <UserAccount 
            username="Admin1" 
            avatarUrl="" 
        />
        </nav>
  );
}