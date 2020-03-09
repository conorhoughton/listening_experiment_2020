
filenames="filenames.txt"


def get_trial_index(line):
    line_vector=line.split(",")
    try:
        return int(line_vector[3].replace("\"",""))
    except:
        print("get_trial_condition - not int")
        return -1

def get_trial_condition(line):
    line_vector=line.split(",")
    try:
        return int(line_vector[10].replace("\"",""))
    except:
        print("get_trial_condition - not int")
        return -1

def get_key(line):
    line_vector=line.split(",")
    try:
        return chr(int(line_vector[11].replace("\"","")))
    except:
        print("get_trial_condition - not int")
        return '!'
    
def name_condition(condition):
    c=int(condition/4);
    if c==0:
        return "an"
    elif c==1:
        return "mp"
    elif c==2:
        return "rr"
    else:
        print("name_condition f/p")
        return "error"
    
def extract_response(qa):
    words=qa.split('"')[7]
    return words

    
def get_qa(line):
    line_vector=line.split(",")
    return line_vector[6]


with open(filenames,'r') as filename_file:
    for filename in filename_file:
        
        filename=filename.strip()

        print("\n"+filename)
        
        this_file=open(filename,'r')
        
        line=this_file.readline()
        line=this_file.readline()
        
        while(get_trial_index(line)<10):
            line=this_file.readline()
        line=this_file.readline()

        condition=get_trial_condition(line)
        condition_name=name_condition(condition)

        print(condition_name)


        while(get_trial_index(line)<54):
            line=this_file.readline()

        print("four word: "+get_key(line))

        line=this_file.readline()
        line=this_file.readline()

        print("two word: "+get_key(line))

        line=this_file.readline()

        print("last stream words: "+extract_response(get_qa(line)))

        line=this_file.readline()

        print("previous stream words: "+extract_response(get_qa(line)))


        line=this_file.readline()
        
        print("feedback: "+extract_response(get_qa(line)))
