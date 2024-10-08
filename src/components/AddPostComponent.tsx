// import React, { useState } from "react";
// import { PlusCircle, Image, Send } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// type PostData = {
//   caption: string;
//   // In a real app, you'd have more fields here, like imageUrl
// };

// const AddPostComponent: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [caption, setCaption] = useState("");

//   const handleOpen = () => setIsOpen(true);
//   const handleClose = () => setIsOpen(false);
//   const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
//     setCaption(e.target.value);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const postData: PostData = {
//       caption,
//     };

//     // Here you would typically handle the post submission
//     // For example, sending the data to an API
//     console.log("Submitting post:", postData);

//     // Reset form and close dialog
//     setCaption("");
//     handleClose();
//   };

//   return (
//     <div className="p-4">
//       <Button onClick={handleOpen} className="flex items-center gap-2 p-6">
//         <PlusCircle className="h-5 w-5" />
//         Add Post
//       </Button>

//       <Dialog open={isOpen} onOpenChange={setIsOpen}>
//         <DialogContent className="sm:max-w-[425px] bg-white">
//           <DialogHeader>
//             <DialogTitle>Create New Post</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="mb-4 bg-white">
//               <Button
//                 variant="outline"
//                 className="w-full h-32 flex flex-col items-center justify-center text-black"
//               >
//                 <Image className="h-6 w-6 mb-2" />
//                 <span>Add Photo</span>
//               </Button>
//             </div>

//             <Textarea
//               placeholder="Write a caption..."
//               value={caption}
//               onChange={handleCaptionChange}
//               className="min-h-[100px]"
//             />

//             <Button
//               type="submit"
//               className="w-full flex items-center justify-center gap-2"
//             >
//               <Send className="h-5 w-5" />
//               Post
//             </Button>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default AddPostComponent;

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type PostData = {
  caption: string;
  imageUrl: string | null;
};

const AddPostComponent: React.FC<{
  onAddPost: (post: { imagePost: string; caption: string }) => void;
}> = ({ onAddPost }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setImage(null);
    setPreviewImage(null);
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setCaption(e.target.value);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Show preview
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Pass the new post data to parent
    if (image) {
      onAddPost({
        imagePost: previewImage ?? "", // Image preview URL
        caption, // Post caption
      });
    }

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
              <label className="w-full h-32 flex flex-col items-center justify-center text-black border border-dashed border-gray-300 cursor-pointer">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="h-32 w-full object-cover"
                  />
                ) : (
                  <>
                    <Image className="h-6 w-6 mb-2" />
                    <span>Add Photo</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
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
