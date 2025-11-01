for f in *; do
  newname=$(echo "$f" | sed -E 's/[Cc]418[- ]*//g' | tr '[:upper:]' '[:lower:]' | tr -d ' ')
  mv -v "$f" "$newname"
done
