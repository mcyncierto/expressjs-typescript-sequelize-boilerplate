import { BaseTransformer } from "./baseTransformer";
import { TransformerAssociationType } from "../types/transformerAssociationType";

export class PostTransformer extends BaseTransformer {
  /**
   * Create a new PostTransformer instance with the specified data format mapping.
   *
   */
  constructor() {
    /**
     * The values in this object represent the fields of the specific resource, while the corresponding
     * keys indicate the names of the fields that will be returned within the response.
     */
    const dataFormat = {
      id: "id",
      title: "title",
      content: "content",
      creator: "creator",
      editor: "editor",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    };

    /**
     * An array of TransformerAssociationType objects representing associations between fields..
     * Each TransformerAssociationType object contains information about the fetched field name,
     * the associated transformer instance, and the transformed field name in the response.
     */
    const associations: TransformerAssociationType[] = [];

    super(dataFormat, associations);
  }
}
