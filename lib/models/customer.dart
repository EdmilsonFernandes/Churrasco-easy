class Customer {
  int? id;
  final String name;
  final String phone;

  Customer({this.id, required this.name, required this.phone});

  Map<String, dynamic> toMap() => {
        'id': id,
        'name': name,
        'phone': phone,
      };

  static Customer fromMap(Map<String, dynamic> map) => Customer(
        id: map['id'] as int?,
        name: map['name'] as String,
        phone: map['phone'] as String,
      );
}
