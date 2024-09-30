export type Side = 'left' | 'right';

export interface ITableColumns {
  /**
   * Key to distinct this column with other columns, also being used to localizing the column's name.
   * Note: the columns have the key "index" will be auto-indexed.
   */
  key: string;
  /**
   * The string to display on the column's header (will be overriden by column's title if it existed)
   */
  name?: string;
  /**
   * The element to display on the column's header (will override column's name)
   */
  title?: JSX.Element;
  /**
   * The width of this column in px. If not set, the width of this column will be adjusted automaticaly.
   */
  width?: number;
  /**
   * Option to hide column's header content (name or title).
   */
  isHiddenHeader?: boolean;
  /**
   * Option to hide column out of the table.
   */
  isHiddenColumn?: boolean;
  /**
   * Option to localizing the content of this column.
   */
  isLocalized?: boolean;
  /**
   * Option to fixed this column to a side of the table.
   * - 'left': fixed this column to the left side.
   * - 'right': fixed this column to the right side.
   */
  fixed?: Side;
  /**
   * This function will be called and replace the cell rendering with it's outcome
   */
  render?: (values: any, index: number) => JSX.Element;
  /**
   * This function will be called when the user click on it (no button-like visual effect).
   */
  onClick?: (values: any, index: number) => any;
}
