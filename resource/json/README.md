# 📚 Complete JSON Tutorial

## What is JSON?

**JSON (JavaScript Object Notation)** is a lightweight, text-based data interchange format. Despite its name suggesting JavaScript, JSON is language-independent and widely used across different programming languages.

## 🎯 Key Characteristics:

- **Human-readable**: Easy to read and write
- **Lightweight**: Minimal syntax overhead
- **Language-independent**: Supported by most programming languages
- **Text-based**: Pure text format
- **Structured**: Organized data representation

## 📋 JSON Syntax Rules:

1. **Data is in name/value pairs**
2. **Data is separated by commas**
3. **Curly braces {} hold objects**
4. **Square brackets [] hold arrays**
5. **Strings must be in double quotes**
6. **No comments allowed**
7. **No trailing commas**

## 🔤 JSON Data Types:

### 1. String

```json
{
  "name": "John Doe",
  "city": "New York"
}
```

### 2. Number

```json
{
  "age": 30,
  "temperature": -5.5,
  "score": 95.7
}
```

### 3. Boolean

```json
{
  "isActive": true,
  "isDeleted": false
}
```

### 4. null

```json
{
  "middleName": null,
  "spouse": null
}
```

### 5. Object

```json
{
  "address": {
    "street": "123 Main St",
    "city": "Boston",
    "zipCode": "02101"
  }
}
```

### 6. Array

```json
{
  "colors": ["red", "green", "blue"],
  "numbers": [1, 2, 3, 4, 5],
  "mixed": ["hello", 42, true, null]
}
```

## ❌ Common Mistakes:

### 1. Single Quotes (WRONG)

```json
// ❌ WRONG
{
  'name': 'John'
}

// ✅ CORRECT
{
  "name": "John"
}
```

### 2. Trailing Commas (WRONG)

```json
// ❌ WRONG
{
  "name": "John",
  "age": 30,
}

// ✅ CORRECT
{
  "name": "John",
  "age": 30
}
```

### 3. Comments (NOT ALLOWED)

```json
// ❌ WRONG
{
  // This is a comment
  "name": "John"
}

// ✅ CORRECT
{
  "name": "John"
}
```

### 4. Undefined Values (WRONG)

```json
// ❌ WRONG
{
  "name": undefined
}

// ✅ CORRECT
{
  "name": null
}
```

## 🛠️ JSON vs JavaScript Object:

### JavaScript Object:

```javascript
const person = {
  name: "John", // No quotes on keys
  age: 30,
  getName: function () {
    // Functions allowed
    return this.name;
  },
};
```

### JSON:

```json
{
  "name": "John", // Quotes required on keys
  "age": 30 // No functions allowed
}
```

## 📝 Best Practices:

1. **Use descriptive key names**
2. **Be consistent with naming conventions**
3. **Validate JSON structure**
4. **Keep nesting levels reasonable**
5. **Use proper indentation for readability**
6. **Handle special characters properly**

## 🔧 JSON Validation:

Always validate your JSON using:

- Online validators (jsonlint.com)
- IDE extensions
- Programming language parsers

## 📖 Next Steps:

1. Check `01-basic-examples.json` for simple examples
2. Explore `02-real-world-examples.json` for practical use cases
3. Study `03-complex-structures.json` for advanced patterns
4. Practice with `04-api-responses.json` for web development
5. Learn validation with `05-schema-examples.json`
