#!/usr/bin/env bash
set -Ceu
#---------------------------------------------------------------------------
# このディレクトリのファイル名を統一する。アンダーバーやスペースをハイフンにする。
# CreatedAt: 2022-05-22
#---------------------------------------------------------------------------

Run() {
	THIS="$(realpath "${BASH_SOURCE:-0}")"; HERE="$(dirname "$THIS")"; PARENT="$(dirname "$HERE")"; THIS_NAME="$(basename "$THIS")"; APP_ROOT="$PARENT";
	cd "$HERE"
	toHyhon() {
		ls -1 | grep '_' | sed 'p;s/_/-/g' | xargs -n2 mv
		ls -1 | grep ' ' | sed 'p;s/ /-/g' | xargs -n2 mv
	}
	toUnderbar() {
		ls -1 | grep '-' | sed 'p;s/-/_/g' | xargs -n2 mv
		ls -1 | grep ' ' | sed 'p;s/ /_/g' | xargs -n2 mv
	}
	#toUnderbar
	toHyhon
}
Run "$@"

