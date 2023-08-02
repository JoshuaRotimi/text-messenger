"use client";

import useConversations from "@/app/hooks/useConversations";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";
import MessageInput from "@/app/conversations/[conversationId]/components/MessageInput";

const Form = () => {
  const { conversationId } = useConversations();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post(`/api/messages`, {
      image: result?.info?.secure_url,
      conversationId,
    });
  };
  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="whcmgm0k"
      >
        <HiPhoto size={30} className={"text-sky-500"} />
      </CldUploadButton>

      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id={"message"}
          register={register}
          errors={errors}
          required
          placeholder={"Write a message"}
        />
        <button
          type="submit"
          className="rounded-full bg-sky-500 p-2 cursor-pointer hover:bg-sky-600 transition"
        >
          <HiPaperAirplane size={18} className={"text-white"} />
        </button>
      </form>
    </div>
  );
};

export default Form;
