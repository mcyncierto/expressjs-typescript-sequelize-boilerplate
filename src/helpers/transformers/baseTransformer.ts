import { TransformerAssociationType } from "../types/transformerAssociationType";
/**
 * Base class for transforming data into a specific format.
 */
export class BaseTransformer {
  /**
   * Creates an instance of BaseTransformer.
   *
   * @param {any} dataFormat - The data format of fields to be used.
   * @param {TransformerAssociationType[]} associations - The model associations to be used.
   */
  constructor(
    private dataFormat: any,
    private associations: TransformerAssociationType[] = []
  ) {
    this.dataFormat = dataFormat;
    this.associations = associations;
  }

  /**
   * Transforms a single resource item into the desired format.
   *
   * @param {any} item - The input data item to be transformed.
   * @param {boolean} [isCollection=false] - Indicates if the item is part of a collection.
   * @param {string[]} [fields=[]] - Specific fields to include in the transformed resource.
   * @returns {object} - The transformed resource data.
   */
  resource(item: any, isCollection: boolean = false, fields: any = []): object {
    let returnDataFormatted: object = this.formatItem(item);
    let returnData: object = {};

    if (fields.length > 0) {
      Object.values<string>(fields).forEach((field: string) => {
        (returnData as any)[field] = (item as any)[field];
      });
    } else {
      returnData = returnDataFormatted;
    }

    // Include eager loading of associations
    for (const association of this.associations) {
      // To cater sub-objects
      const keysArray = association.fetchedFieldName.includes("[.]")
        ? [association.fetchedFieldName.split("[").join("").split("]").join("")] // This is to cater fields with '.' from a raw query
        : association.fetchedFieldName.split(".");
      let itemValue = "";
      if (keysArray.length === 1) {
        itemValue = item[keysArray[0]];
      } else {
        // To cater 1st level of sub-object
        itemValue = item.hasOwnProperty(keysArray[0])
          ? item[keysArray[0]][keysArray[1]]
          : null;
      }
      // ... add other levels of sub-bjects if necessary

      if (itemValue) {
        let transformedData = { data: {} };
        if (Array.isArray(itemValue)) {
          transformedData = association.transformer.collection(itemValue);
        } else {
          transformedData = association.transformer.resource(itemValue);
        }

        returnData = {
          ...returnData,
          [association.transformedFieldName]: transformedData.data,
        };
      }
    }

    return isCollection ? returnData : { data: returnData };
  }

  /**
   * Transforms a collection of resource items into the desired format.
   *
   * @param {any} items - The collection of input data items to be transformed.
   * @param {string[]} [fields=[]] - Specific fields to include in the transformed resource.
   * @returns {object} - The transformed collection data.
   */
  collection(items: any, fields: any = []): { data: object } {
    return {
      data: items.map((item: object) => this.resource(item, true, fields)),
    };
  }

  /**
   * Paginates a collection of data items.
   *
   * @param {any} dataItems - The source data items to be paginated.
   * @param {number} [page=1] - The current page number.
   * @param {number} [pageSize=10] - The number of items per page.
   * @returns {object} - An object containing paginated data, including total items, items for the current page,
   *                    total pages, and the current page number.
   */
  paginate(dataItems: any, page: number = 1, pageSize: number = 10): object {
    // Destructure data into totalItems and rowItems
    const { count: totalItems, rows: rowItems } = dataItems;

    // Determine the current page and default to 1
    const currentPage: number = page && page >= 0 ? +page : 1;

    // Determine the current page size and default to 10
    const currentPageSize: number = pageSize && pageSize >= 0 ? +pageSize : 10;

    /**
     * Calculate the total number of pages based on total items and page size.
     *
     * @param {number} totalItems - The total number of items.
     * @param {number} currentPageSize - The number of items per page.
     * @returns {number} - The calculated total number of pages.
     */
    const calculateTotalPages = (
      totalItems: number,
      currentPageSize: number
    ): number => {
      const totalPagesCount = Math.ceil(totalItems / currentPageSize);
      return !isNaN(totalPagesCount) ? totalPagesCount : 1;
    };
    const totalPages = calculateTotalPages(totalItems, currentPageSize);

    // Transform row items into paginated items
    const data = this.collection(rowItems).data;

    return { totalItems, data, totalPages, currentPage };
  }

  /**
   * Formats an item based on the defined data format.
   *
   * @param {any} item - The input data item to be formatted.
   * @returns {object} - The formatted item according to the defined data format.
   */
  formatItem(item: any): object {
    let formattedItem: any = {};
    for (const key in this.dataFormat) {
      if (this.dataFormat.hasOwnProperty(key)) {
        // To cater alternative values (if other values are null)
        const altValuesArray: string = this.dataFormat[key].split("|");
        let altValueChecker: string | null = null; // Checker if other values are null

        for (const altValue of altValuesArray) {
          if (altValueChecker === null) {
            // To cater sub-objects
            const valArray = altValue.includes("[.]")
              ? [altValue.split("[").join("").split("]").join("")] // This is to cater fields with '.' from a raw query
              : altValue.split(".");

            if (valArray.length === 1) {
              formattedItem[key] = altValueChecker = item[valArray[0]];
            } else {
              // To cater 1st level of sub-object
              formattedItem[key] = altValueChecker = item.hasOwnProperty(
                valArray[0]
              )
                ? item[valArray[0]][valArray[1]]
                : null;
            }
            // ... add other levels of sub-bjects if necessary
          }
        }
      }
    }

    return formattedItem;
  }
}
