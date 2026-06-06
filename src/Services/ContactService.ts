import request from "@/configs/axios";
// import type { FormContactType } from "@/models/Form/FormContactType";
import type { FormContactData } from "@/models/FormContactViewModelType/FormContactViewModelType";

export const postFormContact = (data: FormContactData) => {
  return request.post(`/wp-json/formidable-bridge/v1/submit`, {
    form_id: 2,
    fields: {
      "6": data.name,
      "7": data.phone,
      "8": data.email,
      "9": data.subject,
      "10": data.content,
    },
  });
};
