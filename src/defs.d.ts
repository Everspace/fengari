export type LuaString = Uint8Array

/**
 * Fengari specific string conversion function.
 *
 * Functions as compatability layer
 */
export const luastring_from: typeof Uint8Array.from

/**
 * Fengari specific string conversion function.
 *
 * The value to locate in the array.
 * Returns the index of the first occurrence of a value in an array.
 */
export function luastring_indexOf(s: LuaString, searchElement: number, fromIndex?: number): number

/**
 * Fengari specific string conversion function.
 */
export const luastring_of: typeof Uint8Array.of

/**
 * Test two lua strings for equality
 */
export function luastring_eq(a: LuaString, b: LuaString): boolean

/**
 * implemented as:
 ```javascript
 return s instanceof Uint8Array;
 ```
 */
export function is_luastring(s: any): boolean

// TODO: to_jsstring should probably take an object of options like `{from, to, replacement_char}` instead of
// using positional argumetns. It's more javascript ideomatic. in addition allows to "just do the whole thing"
// with a replacement_char
//
// in addition create an array rather than string concatination.

/**
 * Create a JS string from a LuaString
 * @param value LuaString to convert
 * @param from Where to start in the LuaString
 * @param to Where to end in the LuaString
 * @param replacement_char Use a replacement character `�` instead of throwing a RangeError
 */
export function to_jsstring(value: LuaString, from?: number, to?: number, replacement_char?: boolean): string

// export const to_uristring      = to_uristring;

/**
 * Converts a string to a LuaString.
 * @param str String to convert
 * @param cache Optional external cache (uses an internal cache by default)
 */
export function to_luastring(str: string, cache?: Map<string, LuaString>): LuaString

/**
 * ???
 * @param str Array of bytes or normal string
 */
export function from_userstring(str: string | LuaString ): LuaString

// I think uri_allowed should probably use the JS to URI stuff? seems strange
/**
 * Convert a lua string to a js string with uri escaping.
 * @param str LuaString to convert
 */
export function to_uristring(str: LuaString)

/**
 * Mark for precompiled code.
 * ```javascript
 const LUA_SIGNATURE = to_luastring("\x1bLua")
 ```
 */
export const LUA_SIGNATURE : LuaString
export const LUA_VERSION_MAJOR   : string
export const LUA_VERSION_MINOR   : string
export const LUA_VERSION_NUM     : number
export const LUA_VERSION_RELEASE : string
export const LUA_VERSION         : string
export const LUA_RELEASE         : string
export const LUA_COPYRIGHT       : string
export const LUA_AUTHORS         : string

export const enum ThreadStatus {
  LUA_OK,
  LUA_YIELD,
  LUA_ERRRUN,
  LUA_ERRSYNTAX,
  LUA_ERRMEM,
  LUA_ERRGCMM,
  LUA_ERRERR,
}

export const enum LuaTypeConstants {
  LUA_TNONE = -1,
  LUA_TNIL           ,
  LUA_TBOOLEAN       ,
  LUA_TLIGHTUSERDATA ,
  LUA_TNUMBER        ,
  LUA_TSTRING        ,
  LUA_TTABLE         ,
  LUA_TFUNCTION      ,
  LUA_TUSERDATA      ,
  LUA_TTHREAD        ,
  LUA_NUMTAGS       ,

  /** short strings */
  LUA_TSHRSTR = LUA_TSTRING | (0 << 4),
  /** long strings */
  LUA_TLNGSTR = LUA_TSTRING | (1 << 4),
  /** float numbers */
  LUA_TNUMFLT = LUA_TNUMBER | (0 << 4),
  /** integer numbers */
  LUA_TNUMINT = LUA_TNUMBER | (1 << 4),
  /** Lua closure */
  LUA_TLCL = LUA_TFUNCTION | (0 << 4),
  /** light C function */
  LUA_TLCF = LUA_TFUNCTION | (1 << 4),
  /** C closure */
  LUA_TCCL = LUA_TFUNCTION | (2 << 4),
}

export const enum ArithmeticOperator {
  LUA_OPADD ,  /* ORDER TM, ORDER OP */
  LUA_OPSUB ,
  LUA_OPMUL ,
  LUA_OPMOD ,
  LUA_OPPOW ,
  LUA_OPDIV ,
  /**
   * Intiger division //
   */
  LUA_OPIDIV,
  LUA_OPBAND,
  LUA_OPBOR ,
  LUA_OPBXOR,
  LUA_OPSHL ,
  LUA_OPSHR ,
  LUA_OPUNM ,
  LUA_OPBNOT,
}

export const enum ComparisonOperator {
  LUA_OPEQ,
  LUA_OPLT,
  LUA_OPLE,
}

export const enum EventCode {
  LUA_HOOKCALL     ,
  LUA_HOOKRET      ,
  LUA_HOOKLINE     ,
  LUA_HOOKCOUNT    ,
  LUA_HOOKTAILCALL ,
}

export const enum EventMask {
  LUA_MASKCALL  = (1 << EventCode.LUA_HOOKCALL),
  LUA_MASKRET   = (1 << EventCode.LUA_HOOKRET),
  LUA_MASKLINE  = (1 << EventCode.LUA_HOOKLINE),
  LUA_MASKCOUNT = (1 << EventCode.LUA_HOOKCOUNT),
}

const { LUAI_MAXSTACK } = require('./luaconf.js');
const LUA_REGISTRYINDEX = -(LUAI_MAXSTACK as number) - 1000;

/**
 * TODO
 ```javascript
 return LUA_REGISTRYINDEX - i
 ```
 * @param i TODO
 */
export function lua_upvalueindex(i: number): number


// TODO: Actually export enums?
// I don't think it matters for typescript code since const enum is compiled out to value.

/**
 * Used to specify that lua_call should push all results to the stack
 * @see https://www.lua.org/manual/5.1/manual.html#lua_call
 */
export const LUA_MULTRET             = -1;
export const LUA_MINSTACK = 20;
export const LUA_REGISTRYINDEX       = LUA_REGISTRYINDEX;


/** predefined value in the registry */
export const LUA_RIDX_MAINTHREAD = 1;
/** predefined value in the registry */
export const LUA_RIDX_GLOBALS    = 2;
/** predefined value in the registry */
export const LUA_RIDX_LAST       = LUA_RIDX_GLOBALS;

export type ILuaDebug = {
  /**
   * NaN if empty
   */
  event: number,
  name?: string,
  namewhat?: 'global'|'local'|'field'|'method'
  what?: 'Lua'|'C'|'main'|'tail'
  source: null,

  /**
   * NaN if empty
   */
  currentline: number,

  /**
   * NaN if empty
   */
  linedefined: number,

  /**
   * NaN if empty
   */
  lastlinedefined: number,

  /**
   * Number of upvalues,
   * NaN if empty
   */
  nups: number,

  /**
   * Number of parameters
   * NaN if empty
   */
  nparams: number,
  /**
   * NaN if empty
   */
  isvararg: number,
  /**
   * NaN if empty
   */
  istailcall: number,
  /**
   * NaN if empty
   */
  short_src: null,

  /**
   * active function
   * @private
   */
  i_ci?: any
}

export class lua_Debug implements ILuaDebug {}
