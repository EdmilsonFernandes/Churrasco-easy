import 'package:flutter/material.dart';
import '../models/menu_item.dart';
import '../services/menu_service.dart';

class ItemManagementScreen extends StatefulWidget {
  const ItemManagementScreen({Key? key}) : super(key: key);

  @override
  State<ItemManagementScreen> createState() => _ItemManagementScreenState();
}

class _ItemManagementScreenState extends State<ItemManagementScreen> {
  final MenuService _service = MenuService();
  final TextEditingController _nameController = TextEditingController();
  String _selectedType = 'espetinho';

  @override
  void initState() {
    super.initState();
    _service.init();
  }

  void _addItem() async {
    if (_nameController.text.isEmpty) return;
    final item = MenuItem(name: _nameController.text, type: _selectedType);
    await _service.addItem(item);
    setState(() {
      _nameController.clear();
    });
  }

  void _updateItem(MenuItem item, String name) async {
    final updated = MenuItem(id: item.id, name: name, type: item.type);
    await _service.updateItem(updated);
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final items = _service.items;
    return Scaffold(
      appBar: AppBar(title: const Text('Itens do Card\u00e1pio')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _nameController,
                    decoration: const InputDecoration(labelText: 'Nome'),
                  ),
                ),
                const SizedBox(width: 8),
                DropdownButton<String>(
                  value: _selectedType,
                  items: const [
                    DropdownMenuItem(value: 'espetinho', child: Text('Espetinho')),
                    DropdownMenuItem(value: 'bebida', child: Text('Bebida')),
                  ],
                  onChanged: (value) {
                    if (value != null) {
                      setState(() => _selectedType = value);
                    }
                  },
                ),
                IconButton(
                  icon: const Icon(Icons.add),
                  onPressed: _addItem,
                )
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: items.length,
              itemBuilder: (context, index) {
                final item = items[index];
                final controller = TextEditingController(text: item.name);
                return ListTile(
                  title: TextField(
                    controller: controller,
                    decoration: const InputDecoration(border: InputBorder.none),
                    onSubmitted: (value) {
                      if (value.isNotEmpty) {
                        _updateItem(item, value);
                      }
                    },
                  ),
                  subtitle: Text(item.type),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
