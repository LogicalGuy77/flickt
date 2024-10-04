import React, { useState } from "react";
import { PlusCircle, Image, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type PostData = {
  caption: string;
  // In a real app, you'd have more fields here, like imageUrl
};

const AddPostComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [caption, setCaption] = useState("");

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setCaption(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postData: PostData = {
      caption,
    };

    // Here you would typically handle the post submission
    // For example, sending the data to an API
    console.log("Submitting post:", postData);

    // Reset form and close dialog
    setCaption("");
    handleClose();
  };

  return (
    <div className="p-4">
      <Button onClick={handleOpen} className="flex items-center gap-2 p-6">
        <PlusCircle className="h-5 w-5" />
        Add Post
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4 bg-white">
              <Button
                variant="outline"
                className="w-full h-32 flex flex-col items-center justify-center text-black"
              >
                <Image className="h-6 w-6 mb-2" />
                <span>Add Photo</span>
              </Button>
            </div>

            <Textarea
              placeholder="Write a caption..."
              value={caption}
              onChange={handleCaptionChange}
              className="min-h-[100px]"
            />

            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2"
            >
              <Send className="h-5 w-5" />
              Post
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPostComponent;