import '../models/menu_item.dart';
import 'database_service.dart';

class MenuService {
  final DatabaseService _db = DatabaseService();
  final List<MenuItem> _items = [];

  Future<void> init() async {
    await _db.init();
    _items.clear();
    _items.addAll(await _db.fetchMenuItems());
  }

  List<MenuItem> get items => List.unmodifiable(_items);

  Future<void> addItem(MenuItem item) async {
    final id = await _db.insertMenuItem(item);
    item.id = id;
    _items.add(item);
  }

  Future<void> updateItem(MenuItem item) async {
    await _db.updateMenuItem(item);
    final index = _items.indexWhere((i) => i.id == item.id);
    if (index != -1) {
      _items[index] = item;
    }
  }
}
