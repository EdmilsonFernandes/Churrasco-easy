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

  Map<String, dynamic> toMap() => {
        'id': id,
        'customerName': customerName,
        'items': items.join(','),
        'quantity': quantity,
        'status': status.index,
        'createdAt': createdAt.toIso8601String(),
      };

  static Order fromMap(Map<String, dynamic> map) {
    return Order(
      id: map['id'] as int?,
      customerName: map['customerName'] as String,
      items: (map['items'] as String).split(','),
      quantity: map['quantity'] as int,
      status: OrderStatus.values[map['status'] as int],
      createdAt: DateTime.parse(map['createdAt'] as String),
    );
  }
}
