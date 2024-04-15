extends Node

const AUTHORNAME_MODNAME_DIR := "tomat-enemies_fade_on_low_health"
const AUTHORNAME_MODNAME_LOG_NAME := "tomat-enemies_fade_on_low_health:Main"

var mod_dir_path := ""

var Global:Node

func _init() -> void:
	mod_dir_path = ModLoaderMod.get_unpacked_dir().path_join(AUTHORNAME_MODNAME_DIR)
	install_script_extensions()

func install_script_extensions() -> void:
	ModLoaderMod.install_script_extension("res://mods-unpacked/tomat-enemies_fade_on_low_health/extensions/src/enemy/enemy.gd")

func _ready() -> void:
	ModLoaderLog.info("Ready!", AUTHORNAME_MODNAME_LOG_NAME)
