import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "sonner";
import userPost, { User } from "@/components/store/userStore";
import { Loader } from "lucide-react";

interface ChangeDetailsProps {
  onClose: () => void;
  currentUser: User | null; // Updated to allow null
}

const ChangeDetails: React.FC<ChangeDetailsProps> = ({
  onClose,
  currentUser,
}) => {
  const [loading, setLoading] = useState(false);
  
  // Safe initialization using optional chaining and fallbacks
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
  });
  
  const updateDetails = userPost((state) => state.updateDetails);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserDetailsChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) return; // Guard clause if user is somehow null

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("tokens")}`,
        },
      };

      setLoading(true);

      const response = await axios.patch(
        `${import.meta.env.VITE_URL}/users/update-details`,
        {
          username: formData.username,
          email: formData.email,
        },
        config
      );

      toast.success("User details changed successfully!");
      updateDetails(response.data.data.email, response.data.data.username);
      onClose();
    } catch (error) {
      toast.error("Unable to update user details");
      console.error("user update error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <form action="" onSubmit={handleUserDetailsChange}>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username-1">Username</Label>
            <Input
              id="username-1"
              name="username"
              onChange={handleChange}
              value={formData.username}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              "Save changes"
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default ChangeDetails;