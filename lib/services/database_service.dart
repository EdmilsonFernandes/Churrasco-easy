import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';

import '../models/order.dart';

class DatabaseService {
  Database? _db;

  Future<void> init() async {
    final documents = await getApplicationDocumentsDirectory();
    final path = join(documents.path, 'churrasquinho.db');
    _db = await openDatabase(path, version: 1, onCreate: (db, version) {
      db.execute('''
        CREATE TABLE orders(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          customerName TEXT,
          items TEXT,
          quantity INTEGER,
          status INTEGER,
          createdAt TEXT
        )
      ''');
    });
  }

  Future<int> insertOrder(Order order) async {
    return await _db!.insert('orders', order.toMap());
  }

  Future<List<Order>> fetchOrders() async {
    final maps = await _db!.query('orders', orderBy: 'createdAt ASC');
    return maps.map((m) => Order.fromMap(m)).toList();
  }

  Future<void> updateOrder(Order order) async {
    await _db!.update('orders', order.toMap(), where: 'id = ?', whereArgs: [order.id]);
  }
}
