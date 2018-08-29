#include <webassembly.h>

extern void printMessage(const char*);

export void hello() {
  printMessage("Hello, WebAssembly!");
}
