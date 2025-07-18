import 'package:flutter/material.dart';
import '../models/order.dart';
import '../services/order_service.dart';
import 'item_management_screen.dart';

class OrderQueueScreen extends StatefulWidget {
  const OrderQueueScreen({Key? key}) : super(key: key);

  @override
  State<OrderQueueScreen> createState() => _OrderQueueScreenState();
}

class _OrderQueueScreenState extends State<OrderQueueScreen> {
  final OrderService _service = OrderService();
  final TextEditingController _customerController = TextEditingController();
  final TextEditingController _itemController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _service.init();
  }

  void _addOrder() async {
    if (_customerController.text.isEmpty || _itemController.text.isEmpty) return;
    final order = Order(
      customerName: _customerController.text,
      items: [_itemController.text],
      quantity: 1,
    );
    await _service.addOrder(order);
    setState(() {
      _customerController.clear();
      _itemController.clear();
    });
  }

  void _updateStatus(Order order, OrderStatus status) async {
    await _service.updateOrderStatus(order.id!, status);
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final orders = _service.pendingOrders;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Fila de Pedidos'),
        actions: [
          IconButton(
            icon: const Icon(Icons.list),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => const ItemManagementScreen(),
                ),
              );
            },
          )
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _customerController,
                    decoration: const InputDecoration(labelText: 'Cliente'),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: TextField(
                    controller: _itemController,
                    decoration: const InputDecoration(labelText: 'Espeto'),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.add),
                  onPressed: _addOrder,
                )
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: orders.length,
              itemBuilder: (context, index) {
                final order = orders[index];
                return ListTile(
                  title: Text(order.customerName),
                  subtitle: Text(order.items.join(', ')),
                  trailing: PopupMenuButton<OrderStatus>(
                    onSelected: (status) => _updateStatus(order, status),
                    itemBuilder: (context) => [
                      const PopupMenuItem(
                        value: OrderStatus.delivered,
                        child: Text('Marcar como entregue'),
                      ),
                      const PopupMenuItem(
                        value: OrderStatus.paid,
                        child: Text('Marcar como pago'),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
