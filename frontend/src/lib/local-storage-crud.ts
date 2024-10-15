// Type for any object with an id
type WithId = { id: number | string };

class LocalStorageCRUD {
  // Create or update an item
  static setItem<T extends WithId>(key: string, item: T): void {
    const items = this.getItems<T>(key);
    const index = items.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      items[index] = item;
    } else {
      items.push(item);
    }
    localStorage.setItem(key, JSON.stringify(items));
  }

  // Get all items
  static getItems<T extends WithId>(key: string): T[] {
    const items = localStorage.getItem(key);
    return items ? JSON.parse(items) : [];
  }

  // Get a single item by id
  static getItem<T extends WithId>(
    key: string,
    id: number | string
  ): T | undefined {
    const items = this.getItems<T>(key);
    return items.find((item) => item.id === id);
  }

  // Delete an item
  static deleteItem(key: string, id: number | string): void {
    const items = this.getItems<WithId>(key);
    const filteredItems = items.filter((item) => item.id !== id);
    localStorage.setItem(key, JSON.stringify(filteredItems));
  }

  // Update or create multiple items
  static setItems<T extends WithId>(key: string, newItems: T[]): void {
    const items = this.getItems<T>(key);
    newItems.forEach((newItem) => {
      const index = items.findIndex((item) => item.id === newItem.id);
      if (index !== -1) {
        items[index] = newItem;
      } else {
        items.push(newItem);
      }
    });
    localStorage.setItem(key, JSON.stringify(items));
  }

  // Clear all items for a key
  static clearItems(key: string): void {
    localStorage.removeItem(key);
  }
}

export default LocalStorageCRUD;
