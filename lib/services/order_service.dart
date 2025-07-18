import '../models/order.dart';
import 'database_service.dart';

class OrderService {
  final DatabaseService _db = DatabaseService();
  final List<Order> _orders = [];

  Future<void> init() async {
    await _db.init();
    _orders.clear();
    _orders.addAll(await _db.fetchOrders());
  }

  List<Order> get pendingOrders =>
      _orders.where((o) => o.status == OrderStatus.pending).toList();

  Future<void> addOrder(Order order) async {
    final id = await _db.insertOrder(order);
    order.id = id;
    _orders.add(order);
  }

  Future<void> updateOrderStatus(int id, OrderStatus status) async {
    final index = _orders.indexWhere((o) => o.id == id);
    if (index != -1) {
      final order = _orders[index];
      order.status = status;
      await _db.updateOrder(order);
    }
  }
}
