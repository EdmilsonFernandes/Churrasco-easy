import 'package:intl/intl.dart';

enum OrderStatus { pending, delivered, paid }

class Order {
  int? id;
  final String customerName;
  final List<String> items;
  final int quantity;
  OrderStatus status;
  final DateTime createdAt;

  Order({
    this.id,
    required this.customerName,
    required this.items,
    required this.quantity,
    this.status = OrderStatus.pending,
    DateTime? createdAt,
  }) : createdAt = createdAt ?? DateTime.now();

  static final DateFormat _slashFormat = DateFormat('dd/MM/yyyy');
  static final DateFormat _dashFormat = DateFormat('dd-MM-yyyy');

  Map<String, dynamic> toMap() => {
        'id': id,
        'customerName': customerName,
        'items': items.join(','),
        'quantity': quantity,
        'status': status.index,
        'createdAt': _slashFormat.format(createdAt),
      };

  static Order fromMap(Map<String, dynamic> map) {
    return Order(
      id: map['id'] as int?,
      customerName: map['customerName'] as String,
      items: (map['items'] as String).split(','),
      quantity: map['quantity'] as int,
      status: OrderStatus.values[map['status'] as int],
      createdAt: _parseDate(map['createdAt'] as String),
    );
  }

  static DateTime _parseDate(String value) {
    if (value.contains('-')) {
      return _dashFormat.parse(value);
    }
    return _slashFormat.parse(value);
  }
}
