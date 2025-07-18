class MenuItem {
  int? id;
  final String name;
  final String type; // 'espetinho' or 'bebida'

  MenuItem({this.id, required this.name, required this.type});

  Map<String, dynamic> toMap() => {
        'id': id,
        'name': name,
        'type': type,
      };

  static MenuItem fromMap(Map<String, dynamic> map) => MenuItem(
        id: map['id'] as int?,
        name: map['name'] as String,
        type: map['type'] as String,
      );
}
