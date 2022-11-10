import { Schema } from 'prosemirror-model';
import { Plugin, PluginSpec } from 'prosemirror-state';

export class SafePlugin<T = any, S extends Schema = any> extends Plugin {
  // This variable isn't (and shouldn't) be used anywhere. Its purpose is
  // to distinguish Plugin from SafePlugin, thus ensuring that an 'unsafe'
  // Plugin cannot be assigned as an item in EditorPlugin → pmPlugins.
  _isATypeSafePlugin!: never;

  constructor(spec: PluginSpec<T>) {
    super(spec);
  }
}

export default SafePlugin;
