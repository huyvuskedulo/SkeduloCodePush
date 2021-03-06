//
//  JobSimulatorViewController.swift
//  SkeduloCodePush
//
//  Created by Huy Vu on 17/01/2022.
//

import UIKit
import React

class JobSimulatorViewController : UIViewController {
    
    @IBAction func onCompleteJobClicked(_ sender: Any) {
        
        JSProcessManager.shared.invokeMethod(methodName: "onJobCompleted", callBack: { result in
            
            if (result.message != "") {
                ViewController.showWindowAlert(alertMessage: result.message, inVC: self, callback: {
                    UIApplication.shared.open(URL(string: result.redirectionUrl)!, options: [:], completionHandler: nil)
                });
            } else {
                ViewController.showWindowAlert(alertMessage: "Job changed to Completed", inVC: self, callback: nil);
            }
        })
    }
}
 
