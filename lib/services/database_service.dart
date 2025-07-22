import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';

import '../models/order.dart';
import '../models/menu_item.dart';

class DatabaseService {
  Database? _db;

  Future<void> init() async {
    final documents = await getApplicationDocumentsDirectory();
    final path = join(documents.path, 'churrasquinho.db');
    _db = await openDatabase(
      path,
      version: 2,
      onCreate: (db, version) {
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
        db.execute('''
          CREATE TABLE items(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            type TEXT
          )
        ''');
      },
      onUpgrade: (db, oldVersion, newVersion) async {
        if (oldVersion < 2) {
          await db.execute('''
            CREATE TABLE items(
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT,
              type TEXT
            )
          ''');
        }
      },
    );
  }

  Future<int> insertOrder(Order order) async {
    return await _db!.insert('orders', order.toMap());
  }

  Future<List<Order>> fetchOrders() async {
    final maps = await _db!.query('orders', orderBy: 'id ASC');
    return maps.map((m) => Order.fromMap(m)).toList();
  }

  Future<void> updateOrder(Order order) async {
    await _db!.update('orders', order.toMap(), where: 'id = ?', whereArgs: [order.id]);
  }

  Future<int> insertMenuItem(MenuItem item) async {
    return await _db!.insert('items', item.toMap());
  }

  Future<List<MenuItem>> fetchMenuItems() async {
    final maps = await _db!.query('items', orderBy: 'name ASC');
    return maps.map((m) => MenuItem.fromMap(m)).toList();
  }

  Future<void> updateMenuItem(MenuItem item) async {
    await _db!.update('items', item.toMap(), where: 'id = ?', whereArgs: [item.id]);
  }
}
