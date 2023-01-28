import os
import subprocess

def copy_to_clipboard(output):
    """
    Copies the given output to the clipboard
    """
    process = subprocess.Popen('clip', stdin=subprocess.PIPE)
    process.communicate(output.encode('utf-8'))

def get_project_structure(path, level=0):
    """
    Recursive function that creates a string representation of the directory tree of the given path.
    Only files with extensions in the ALLOWED_EXTENSIONS list and directories up to the given level
    will be included in the tree.
    """
    structure = ""
    ALLOWED_EXTENSIONS = ['.js', '.tsx', '.json', '.bat', '.properties', '.gradle']
    MAX_FILES = {1: 50, 2: 100, 3: 150} # level-specific MAX_FILES
    for item in os.listdir(path):
        item_path = os.path.join(path, item)
        # check if the current item is a directory and if the level is less than 3
        if os.path.isdir(item_path) and level < 3:
            structure += "  " * (level+1) + "|-- " + item + "/\n"
            structure += get_project_structure(item_path, level + 1)
        # check if the current item is a file
        elif os.path.isfile(item_path):
            file_extension = os.path.splitext(item)[1]
            # if file_extension in ALLOWED_EXTENSIONS:
            structure += "  " * (level+1) + "|-- " + item + "\n"
    # check if the number of files exceeds the MAX_FILES limit
    if structure.count("\n") >= MAX_FILES.get(level, MAX_FILES[3]):
        structure = "  " * (level+1) + "[ lots of files ]\n"
    return structure

if __name__ == "__main__":
    current_directory = os.getcwd()
    # Add "RootFolder/" to the project structure
    project_structure = "RootFolder/\n" + get_project_structure(current_directory)
    copy_to_clipboard(project_structure)
    print("Project structure copied to clipboard!")
