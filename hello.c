#include <webassembly.h>

extern void printMessage(int);

export void hello() {
  printMessage(42);
}
